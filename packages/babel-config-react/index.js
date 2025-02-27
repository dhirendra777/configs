module.exports = function (api) {
    const presets = ['@babel/react'],
        plugins = [
            [
                'babel-plugin-styled-components',
                {
                    pure: true,
                    displayName: true,
                    minify: true,
                    transpileTemplateLiterals: true
                }
            ],
            '@babel/plugin-transform-runtime',
            'inline-react-svg'
        ];

    if (api.env() === 'development') {
        plugins.push('react-hot-loader/babel');
    }

    return { presets, plugins, extends: '@medly/babel-config' };
};
