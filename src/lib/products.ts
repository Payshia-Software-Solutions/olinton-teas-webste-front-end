
export type Product = {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    price: string;
    type: string;
}

export const products: Product[] = [
    {
        id: 'earl-grey-supreme',
        name: 'Earl Grey Supreme',
        description: 'Classic bergamot blend with cornflower petals',
        longDescription: 'A more sophisticated Earl Grey, our supreme version uses a blend of exquisite black teas and an extra touch of citrusy bergamot oil, complemented by beautiful blue cornflower petals.',
        price: 'LKR 8,750',
        type: 'Black Tea',
    },
    {
        id: 'ceylon-green',
        name: 'Ceylon Green',
        description: 'Fresh mountain green tea with delicate notes',
        longDescription: 'Sourced from the lush highlands of Ceylon, this green tea is light and refreshing. It has a delicate, slightly grassy flavor profile with a smooth, clean finish that is both invigorating and calming.',
        price: 'LKR 8,050',
        type: 'Green Tea',
    },
    {
        id: 'silver-tips',
        name: 'Silver Tips',
        description: 'Rare white tea with subtle floral aroma',
        longDescription: 'Also known as "White Tea," Silver Tips are the unopened buds of the tea plant. This rare and exquisite tea offers a subtle, nuanced flavor with sweet, floral notes and a silky smooth texture.',
        price: 'LKR 14,000',
        type: 'White Tea',
    },
    {
        id: 'high-grown-oolong',
        name: 'High Grown Oolong',
        description: 'Semi-fermented tea with complex flavor profile',
        longDescription: 'Our high-grown Oolong is a semi-fermented tea that strikes a perfect balance between green and black teas. It boasts a complex flavor profile with notes of honey, orchids, and a hint of roasted nuts.',
        price: 'LKR 10,500',
        type: 'Oolong',
    },
    {
        id: 'black-tea',
        name: 'Royal Black Tea',
        description: 'A robust and full-bodied classic, perfect for a morning boost. Notes of citrus and honey.',
        longDescription: 'A quintessential classic, our Royal Black Tea is robust, full-bodied, and rich in flavor. It offers a malty depth with subtle notes of citrus and honey, making it the perfect companion for your morning ritual.',
        price: 'LKR 4,550',
        type: 'Black Tea',
    },
    {
        id: 'green-tea',
        name: 'Serene Green Tea',
        description: 'Delicate and refreshing with a light, grassy flavor and a smooth, clean finish.',
        longDescription: 'Experience tranquility with our Serene Green Tea. This delicate and refreshing brew features a light, grassy flavor profile and a smooth, clean finish that soothes the senses and uplifts the spirit.',
        price: 'LKR 5,250',
        type: 'Green Tea',
    },
];
