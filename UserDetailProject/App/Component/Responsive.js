//Responsive

import {Dimensions,PixelRatio,Platform} from 'react-native';

const {height,width}=Dimensions.get('window');

const aspectRatio=width/(Platform.OS ==="ios" ? 350:400);

const getLayoutSize = valueDimen => {
    var newScale=((aspectRatio*valueDimen)-valueDimen)*0.4+valueDimen
    return newScale
};

const getFontSize =valueFontSize => {
    var newScale=((aspectRatio*valueFontSize)-valueFontSize)*0.4+valueFontSize
    return valueFontSize
};

export {
    getFontSize,
    getLayoutSize,
};