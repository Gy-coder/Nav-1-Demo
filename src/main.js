const $siteList = $('.siteList')
const $lastList = $('.lastList')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: './img/google.png', url: 'https://google.com' }
]


const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')    //删除/开头的内容
}

const render = () => {
    $('.siteList').find('li:not(.lastList)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class='close'>
                       <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
            </li>
        `)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()   //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
        $li.insertBefore($lastList)
    })
}
render()
$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
})


window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}


$(document).on('keypress', (e) => {
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === e.key) {
            window.open(hashMap[i].url)
        }
    }
})