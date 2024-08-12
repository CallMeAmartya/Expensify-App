import React from 'react';
import {View} from 'react-native';
import Button from '@components/Button';
import * as Expensicons from '@components/Icon/Expensicons';
import useLocalize from '@hooks/useLocalize';
import useSingleExecution from '@hooks/useSingleExecution';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import * as SearchUtils from '@libs/SearchUtils';
import CONST from '@src/CONST';
import type {TranslationPaths} from '@src/languages/types';
import type {SearchDataTypes} from '@src/types/onyx/SearchResults';
import type IconAsset from '@src/types/utils/IconAsset';
import type {SearchQueryString, SearchStatus} from './types';

type SearchStatusBarProps = {
    type: SearchDataTypes;
    status: SearchStatus;
};

const statusMenuOptions: {[key in SearchDataTypes]: Array<{key: SearchStatus; icon: IconAsset; text: TranslationPaths; query: SearchQueryString}>} = {
    [CONST.SEARCH.DATA_TYPES.TRANSACTION]: [
        {
            key: CONST.SEARCH.STATUS.EXPENSE.ALL,
            icon: Expensicons.All,
            text: 'common.all',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.TRANSACTION, CONST.SEARCH.STATUS.EXPENSE.ALL),
        },
        {
            key: CONST.SEARCH.STATUS.EXPENSE.DRAFTS,
            icon: Expensicons.Pencil,
            text: 'common.drafts',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.TRANSACTION, CONST.SEARCH.STATUS.EXPENSE.DRAFTS),
        },
        {
            key: CONST.SEARCH.STATUS.EXPENSE.SHARED,
            icon: Expensicons.Send,
            text: 'common.shared',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.TRANSACTION, CONST.SEARCH.STATUS.EXPENSE.SHARED),
        },
        {
            key: CONST.SEARCH.STATUS.EXPENSE.FINISHED,
            icon: Expensicons.MoneyBag,
            text: 'common.finished',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.TRANSACTION, CONST.SEARCH.STATUS.EXPENSE.FINISHED),
        },
    ],
    [CONST.SEARCH.DATA_TYPES.REPORT]: [
        {
            key: CONST.SEARCH.STATUS.EXPENSE.ALL,
            icon: Expensicons.All,
            text: 'common.all',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.REPORT, CONST.SEARCH.STATUS.EXPENSE.ALL),
        },
        {
            key: CONST.SEARCH.STATUS.EXPENSE.DRAFTS,
            icon: Expensicons.Pencil,
            text: 'common.drafts',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.REPORT, CONST.SEARCH.STATUS.EXPENSE.DRAFTS),
        },
        {
            key: CONST.SEARCH.STATUS.EXPENSE.SHARED,
            icon: Expensicons.Send,
            text: 'common.shared',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.REPORT, CONST.SEARCH.STATUS.EXPENSE.SHARED),
        },
        {
            key: CONST.SEARCH.STATUS.EXPENSE.FINISHED,
            icon: Expensicons.MoneyBag,
            text: 'common.finished',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.REPORT, CONST.SEARCH.STATUS.EXPENSE.FINISHED),
        },
    ],
    [CONST.SEARCH.DATA_TYPES.EXPENSE]: [
        {
            key: CONST.SEARCH.STATUS.EXPENSE.ALL,
            icon: Expensicons.All,
            text: 'common.all',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.EXPENSE, CONST.SEARCH.STATUS.EXPENSE.ALL),
        },
        {
            key: CONST.SEARCH.STATUS.EXPENSE.DRAFTS,
            icon: Expensicons.Pencil,
            text: 'common.drafts',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.EXPENSE, CONST.SEARCH.STATUS.EXPENSE.DRAFTS),
        },
        {
            key: CONST.SEARCH.STATUS.EXPENSE.SHARED,
            icon: Expensicons.Send,
            text: 'common.shared',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.EXPENSE, CONST.SEARCH.STATUS.EXPENSE.SHARED),
        },
        {
            key: CONST.SEARCH.STATUS.EXPENSE.FINISHED,
            icon: Expensicons.MoneyBag,
            text: 'common.finished',
            query: SearchUtils.buildCannedSearchQuery(CONST.SEARCH.DATA_TYPES.EXPENSE, CONST.SEARCH.STATUS.EXPENSE.FINISHED),
        },
    ],
    [CONST.SEARCH.DATA_TYPES.INVOICE]: [
        {key: CONST.SEARCH.STATUS.EXPENSE.ALL, icon: Expensicons.Inbox, text: 'common.expenses', query: SearchUtils.buildCannedSearchQuery()},
    ],
    [CONST.SEARCH.DATA_TYPES.TRIP]: [
        {key: CONST.SEARCH.STATUS.EXPENSE.ALL, icon: Expensicons.Inbox, text: 'common.expenses', query: SearchUtils.buildCannedSearchQuery()},
    ],
};

function SearchStatusBar({type, status}: SearchStatusBarProps) {
    const {singleExecution} = useSingleExecution();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const theme = useTheme();
    const {translate} = useLocalize();

    return (
        <View style={[styles.flexRow, styles.mh5, styles.mb5]}>
            {statusMenuOptions[type].map((item) => {
                const onPress = singleExecution(() => Navigation.setParams({q: item.query}));
                const isActive = status === item.key;

                return (
                    <Button
                        key={item.key}
                        text={translate(item.text)}
                        onPress={onPress}
                        icon={item.icon}
                        iconFill={isActive ? theme.success : undefined}
                        innerStyles={!isActive && styles.bgTransparent}
                        textStyles={!isActive ? StyleUtils.getTextColorStyle(theme.textSupporting) : undefined}
                        medium
                    />
                );
            })}
        </View>
    );
}

SearchStatusBar.displayName = 'SearchStatusBar';

export default SearchStatusBar;
