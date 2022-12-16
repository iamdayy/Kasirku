import { supabase } from "@/supabase/supabase.config";
class ProductServices {
  async loadProducts() {
    const { data, error } = await supabase.from("products").select(`
    *,
    category (
      *
    )
  `);
    return { data, error };
  }
  loadImage(payload: { image: string; }) {
    const { data} = supabase.storage.from('product-photo').getPublicUrl(payload.image);
    return { data, }
  } 
  async addNewProduct(product: any) {
    try {
      const imagePath = 'products/' + Math.random() + product.image.name;

      const { data: sData, error: sError } = await supabase.storage.from("products-photo").upload(imagePath, product.image);
      if (sError) { throw sError }
      const { data: dbData, error: dbError } = await supabase
        .from('products')
        .insert({
          title: product.title,
          category_id: product.category_id,
          image: sData.path,
          price: product.price,
          stock: product.stock
        });
      if (dbError) { throw dbError }

      return { success: true, data: dbData };
    } catch (e) {
      return { success: false, error: e };
    }
  }
  async editProduct(product: any) {
    if (product.image) {
      const { data: sData, error: sError } = await supabase.storage.from("products-photo").update(product.imagePath, product.image);
      if (sError) { throw sError }
      product.imagePath = sData.path;
    }
    const { data: dbData, error: dbError } = await supabase
      .from('products')
      .upsert({
        title: product.title,
        image: product.imagePath,
        category_id: product.category_id,
        price: product.price,
        stock: product.stock
      });
    if (dbError) { throw dbError }

    return { success: true, data: dbData };
  }
  async removeProduct(product: { id: any, image: any }) {
      // delete from database
      const { error: prodError } = await supabase.from("products")
        .delete()
        .eq("id", product.id);
      if (prodError) throw prodError;

      // deleting from storage
      if (product?.image) {
        const { error: storageError } = await supabase.storage
          .from("product-bucket")
          .remove([product.image]);

        if (storageError) throw storageError;
      }
  }
}
export default new ProductServices;