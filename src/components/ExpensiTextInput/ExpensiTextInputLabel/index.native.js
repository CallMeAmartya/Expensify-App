import React, {memo} from 'react';
import {Animated} from 'react-native';
import styles from '../../../styles/styles';
import labelStyles from './overrideLabelStyles';
import propTypes from './expensiTextInputLabelPropTypes';

const ExpensiTextInputLabel = props => (
    <Animated.Text
        style={[
            styles.expensiTextInputLabel,
            labelStyles,
            styles.expensiTextInputLabelTransformation(
                props.labelTranslateY,
                props.labelTranslateX,
                props.labelScale,
            ),
        ]}
    >
        {props.label}
    </Animated.Text>
);

ExpensiTextInputLabel.propTypes = propTypes;
ExpensiTextInputLabel.displayName = 'ExpensiTextInputLabel';

export default memo(ExpensiTextInputLabel);
