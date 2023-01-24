/**
 * 切换主题颜色
 * @param currentThemeName 当前主题颜色
 */
export default function (currentThemeName: string = 'default'): void {
  const headNode = document.getElementsByTagName('html')[0]
  headNode.className = currentThemeName
}
