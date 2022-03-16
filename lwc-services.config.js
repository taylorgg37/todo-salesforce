module.exports = {
    resources: [{ from: 'src/client/resources/', to: 'dist/resources/' }],
    sourceDir: './src/client',   
    devServer: {
        proxy: {
            '/api/todos': 'http://localhost:3002',
            '/api/auth': 'http://localhost:3003',
        }
    }
};
