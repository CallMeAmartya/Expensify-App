import {useFocusEffect} from '@react-navigation/native';
import type {ForwardedRef} from 'react';
import React, { forwardRef, useCallback, useContext} from 'react';
import type { FlatListProps} from 'react-native';
import {FlatList} from 'react-native';
import {ActionListContext} from '@pages/home/ReportScreenContext';

// FlatList wrapped with the freeze component will lose its scroll state when frozen (only for Android).
// CustomFlatList saves the offset and use it for scrollToOffset() when unfrozen.
function CustomFlatList<T>(props: FlatListProps<T>, ref: ForwardedRef<FlatList>) {
    const {scrollPosition, setScrollPosition} = useContext(ActionListContext);

    const onScreenFocus = useCallback(() => {
        if (typeof ref === 'function') {
            return;
        }
        if (!ref?.current || !scrollPosition?.offset) {
            return;
        }
        if (ref.current && scrollPosition.offset) {
            ref.current.scrollToOffset({offset: scrollPosition.offset, animated: false});
        }
    }, [scrollPosition?.offset, ref]);

    useFocusEffect(
        useCallback(() => {
            onScreenFocus();
        }, [onScreenFocus]),
    );

    return (
        <FlatList<T>
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            onScroll={(event) => props.onScroll?.(event)}
            onMomentumScrollEnd={(event) => {
                setScrollPosition({offset: event.nativeEvent.contentOffset.y});
            }}
            ref={ref}
        />
    );
}

CustomFlatList.displayName = 'CustomFlatListWithRef';
export default forwardRef(CustomFlatList);
