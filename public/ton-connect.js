document.getElementById('connect-wallet').addEventListener('click', async () => {
    // Убедитесь, что библиотека TonConnect загружена
    if (window.TonConnect) {
        const tonConnect = new TonConnect({
            bridge: 'https://bridge.tonconnect.org', // Укажите URL вашего мостового сервера
            network: 'mainnet' // или 'testnet'
        });

        try {
            const session = await tonConnect.connect();
            console.log('Connected:', session);
            // Здесь можно обработать информацию о сессии, например, сохранить адрес кошелька
        } catch (error) {
            console.error('Connection failed:', error);
        }
    } else {
        console.error('TonConnect library not found.');
    }
});
