import { supabase } from '@/supabase/supabase.config';
class OrderServices {
    async fetchData() {
        const { data, error } = await supabase.from("order").select(`*,product_order(*)`)
        return { data, error }
    }
    async addNewOrder(order: any) {
        try {
            const imagePath = 'invoices/' + Math.random() + '.pdf';

            const { data: sData, error: sError } = await supabase.storage.from("invoice-pdf").upload(imagePath,order.invoice);
            if (sError) { throw sError }
            const {data: dbData, error: dbError} = await supabase.from('order').insert({
                table: order.table,
                amount: order.amount,
                invoice_pdf: sData.path,
                success: order.status
            }).select();
            const orderId: any = dbData?.map((data) => {
                return { id: data.id, invoice_num: data.invoice_id }
            });
            order.products.map(async (product: any) => {
                const { data, error } = await supabase.from('product_order').insert({
                    product_id: product.id,
                    quantity: product.quantity,
                    order_id: JSON.parse(orderId[0].id)
                }).select()
                return { data, error }
            });
            return {dbData, dbError};
        } catch (error) {
            console.log(error);

        }
    }
    async loadPdf(path: any) {
        try {
       const { data, error } = await supabase.storage.from("invoice-pdf").download(path);
       if (error) { throw error }
       return data
        } catch (error) {
            return error
        }
    }
}

export default new OrderServices;