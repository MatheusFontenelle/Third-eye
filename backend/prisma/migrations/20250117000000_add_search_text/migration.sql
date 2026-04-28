-- Add searchText column to products
ALTER TABLE "products" ADD COLUMN "searchText" TEXT;

-- Create index for searchText
CREATE INDEX "products_searchText_idx" ON "products"("searchText");

