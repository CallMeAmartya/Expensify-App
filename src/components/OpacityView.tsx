import React from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {ViewStyle} from 'react-native';
import variables from '../styles/variables';
import * as StyleUtils from '../styles/StyleUtils';
import shouldRenderOffscreen from '../libs/shouldRenderOffscreen';

type OpacityViewProps = {
    /**
     * Should we dim the view
     */
    shouldDim: boolean;

    /**
     * Content to render
     */
    children: React.ReactNode;

    /**
     * Array of style objects
     * @default []
     */
    // eslint-disable-next-line react/forbid-prop-types
    style: ViewStyle | ViewStyle[];

    /**
     * The value to use for the opacity when the view is dimmed
     * @default 0.5
     */
    dimmingValue?: number;

    /** Whether the view needs to be rendered offscreen (for Android only) */
    needsOffscreenAlphaCompositing?: boolean;
};

function OpacityView({shouldDim, children, style = [], dimmingValue = variables.hoverDimValue, needsOffscreenAlphaCompositing = false}: OpacityViewProps) {
    const opacity = useSharedValue(1);
    const opacityStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    React.useEffect(() => {
        if (shouldDim) {
            opacity.value = withTiming(dimmingValue, {duration: 50});
        } else {
            opacity.value = withTiming(1, {duration: 50});
        }
    }, [shouldDim, dimmingValue, opacity]);

    return (
        <Animated.View
            style={[opacityStyle, ...StyleUtils.parseStyleAsArray(style)]}
            needsOffscreenAlphaCompositing={shouldRenderOffscreen ? needsOffscreenAlphaCompositing : undefined}
        >
            {children}
        </Animated.View>
    );
}

OpacityView.displayName = 'OpacityView';
export default OpacityView;
