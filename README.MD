## React Native Adjust StyleSheet

根据设备的宽度、缩放比以及设计稿的宽度对不同设备进行适配

#### 安装
`npm install react-native-adjust-stylesheet`

#### 方法
- `adjust(designSize: number): number`  
  将设计稿中的尺寸转换成适配后的尺寸
- `setAdjustOptions(options: adjustOptions): void`  
  配置项
- `addToStyleSheet(key: string = 'adjust'): void`  
  将方法添加至`React Native`的`StyleSheey`中，可通过`StyleSheet[key](styles)`生成样式；

#### `adjustOptions`
```javascript
{
    allowFontScale: false, // 是否允许缩放字体
    designWidth: 750, // 设计稿的宽度
    skipKeys: [],  // 使用添加至样式表中的方法时，该数组中的key对应的值不会被调整
}
```

#### 使用
```javascript
import {StyleSheet} from 'react-native';
import adjust, {setAdjustOptions, addToStyleSheet} from 'react-native-adjust-stylesheet';

// 调整配置项
setAdjustOptions({
    allowFontScale: false, // 设置不允许系统缩放字体
})

// 为StyleSheet添加adjust方法
addToStyleSheet('adjust');

const styles = StyleSheet.adjust({
    container: {
        fontSize: 20,
        width: 100,
        height: 100,
    }
})


adjust(20)  // => 设配后的尺寸
// 单独使用
const styles2 = StyleSheet.create({
    container: {
        width: '100%',
        height: adjust(500),
    }
})


```