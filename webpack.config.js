module.exports = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
							sassOptions: {
								localIdentName: '[folder]-[name]-[local]__[hash:base64:10]'
							}
                        }
                    }
                ],
                include: /\.module\.scss$/
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /\.module\.scss$/
            }
        ]
    }
}
