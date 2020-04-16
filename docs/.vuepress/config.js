module.exports = {
    base: '/notesblogreco/',
    title: 'Just Fly',
    theme: 'reco',
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }]
    ],
    // 显示行号
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        // 侧边栏
        sidebar: 'auto',
        // 启用页面滚动，vuepress测试内容
        smoothScroll: true,
        nav: [
            { text: '个人简历', link: '/resume/' },
            {
                text: '学习笔记',
                ariaLabel: 'StudyNotes',
                items: [
                    {
                        text: '整理完成',
                        items: [
                            { text: 'HTML笔记', link: '/html/' },
                            { text: 'CSS笔记', link: '/css/' },
                            { text: 'Git笔记', link: '/git/' },
                            { text: 'Github笔记', link: '/github/' },
                        ]
                    },
                    {
                        text: '正在整理',
                        items: [
                            { text: 'JS笔记', link: '/javascript/' },
                            { text: 'vueJs', link: '/vuejs/' },
                            { text: 'AJAX', link: '/ajax/' }

                        ]
                    },
                    {
                        text: '稍后整理',
                        items: [
                            { text: '算法', link: '/algorithm/' },
                            { text: 'ES6', link: '/es6/' },
                            { text: 'Webpack', link: '/webpack/' },
                            { text: 'NodeJs', link: '/node/' }
                        ]
                    }
                ]
            },
            { text: 'Github', link: 'https://github.com/JustFlyingInTheSky/notesblogreco' },
            { text: '关于本站', link: '/about/' }
        ]
    }
}