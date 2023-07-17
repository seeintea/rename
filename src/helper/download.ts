export const downloadFile = (name: string, url: string) => {
  const element = document.createElement('a');
  element.download = name;
  element.href = url;
  element.style.display = 'none';
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}