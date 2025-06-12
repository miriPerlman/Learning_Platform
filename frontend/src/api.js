export const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/category/kitchen-accessories');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                resolve(result.products);
            } catch (error) {
                reject(error.message);
            }
        }, 1000);
    });
};