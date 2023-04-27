export const ExtractImgSrcBase64 = async (html: string) => {
    const reImg = /<img\s+(\w+=".+"\s*)*src="data:image\/(png|jpg|jpeg|bmp|gif)\;base64,[^"]+"\s*(\w+=".+"\s*)*>/g
    const reSrc = /src="[^"]+"/g
    const rtSrcArray: string[] = []
    const imgArray = [...html.matchAll(reImg)]
    imgArray.forEach((element) => {
        // console.log(element[0])
        const array = [...element[0].matchAll(reSrc)]
        array.forEach((element) => {
            // console.log(element[0])
            rtSrcArray.push(element[0].slice(5, -1)) // remove 'src=' etc.
        })
    })
    return rtSrcArray
}

export const ExtractIframeSrcUrl = async (html: string) => {
    const reIframe = /<iframe\s+(\w+=".+"\s*)*src="https?:\/\/[^"]+"\s*(\w+=".+"\s*)*>.*<\/iframe>/g
    const reSrc = /src="[^"]+"/g
    const rtSrcArray: string[] = []
    const imgArray = [...html.matchAll(reIframe)]
    imgArray.forEach((element) => {
        // console.log(element[0])
        const array = [...element[0].matchAll(reSrc)]
        array.forEach((element) => {
            // console.log(element[0])
            rtSrcArray.push(element[0].slice(5, -1)) // remove 'src=' etc.
        })
    })
    return rtSrcArray
}

(async () => {
    const html1 = '<p><img width="100" src="data:image/png;base64,iVBORw0Jggg==2" height="200"></p> <img src="data:image/png;base64,iVNSUhEkJggg==1">  <img src="data:image/jpg;base64,iVNSUhEkJggg==3">';
    const html2 = `<iframe class="ql-video" allowfullscreen="true" src="http://api.v-hub.net/assets/qmiao/2023-04/video/video1-1682583389-crop.mp4" frameborder="0" > </iframe>`
    console.log(await ExtractImgSrcBase64(html1))
    console.log(await ExtractIframeSrcUrl(html2))
})()
