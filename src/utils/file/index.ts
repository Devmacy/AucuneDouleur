/**
 * 读取文件
 * @param file blob对象
 */
const readFile = (file: Blob) => {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsBinaryString(file)
        reader.onload = (ev) => {
            if (!ev.target) {
                return resolve({})
            }
            resolve(ev.target.result)
        }
    })
}

export {readFile}
