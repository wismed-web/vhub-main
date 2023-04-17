export const ExtractImgSrc = async (html: string) => {

    // console.log(html)

    const reImg = /<img\s+(\w+=".+"\s*)*src="data:image\/(png|jpg|jpeg|bmp)\;base64,[^"]+">/g
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

// (async () => {
//     const html = '<p><img width="100" src="data:image/png;base64,iVBORw0Jggg==2"></p> <img src="data:image/png;base64,iVNSUhEkJggg==1">  <img src="data:image/jpg;base64,iVNSUhEkJggg==3">';
//     const rt = await ExtractImgSrc(html)
//     console.log(rt)
// })()

// export const ExtractVideo = async (html: string) => {
// }