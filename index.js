/* *
 * Created by render on 2018/5/9
 * */
import {
    Dimensions,
    StyleSheet,
    PixelRatio,
} from 'react-native';

const device = Dimensions.get('window');  //设备的物理像素宽高

// const minSize = 1 / PixelRatio.get();  // 设备最小size

let adjustOptions = {
    allowFontScale: false,
    designWidth: 750,
    skipKeys: [],
}

/**
 * @function adjust
 * @desc 根据设计稿宽度和设备实际宽度进行适配
 * @param {Number}size 设计稿宽的
 * @return {Number}adjustedSize 调整后的大小
 * */
function adjust(size) {
    const adjustedSize = size * device.width / adjustOptions.designWidth;
    return PixelRatio.roundToNearestPixel(adjustedSize);
};

export const setAdjustOptions = function(options) {
    adjustOptions = Object.assign({}, adjustOptions, options);
}

export const addToStyleSheet = function(key = 'adjust') {
    // 跳过下述像素无关项
    const filterArr = ['zIndex', 'flex', 'opacity'].concat(adjustOptions.skipKeys);
    /**
     * @function adjust
     * @desc 调整样式表，根据上述adjust函数进行适配，对于复杂样式可用create+adjust
     * @param {Object}styles 样式表
     * @return {Object}SheetSheet 调整后的样式表
     * */
    StyleSheet[key] = styles => {
        for (let style of Object.values(styles)) {
            for (let [key, value] of Object.entries(style)) {
                if (
                    typeof value !== 'number' ||
                    filterArr.includes(key)
                ) continue; //跳过无需转换的项

                key === 'fontSize' && !adjustOptions.allowFontScale
                    ? style[key] = adjust(value / device.fontScale)
                    : style[key] = adjust(value);
            }
        }

        return StyleSheet.create(styles);
    };
}

export default adjust;