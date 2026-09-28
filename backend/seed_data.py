import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from product.models import Category, Product, Variation

def seed():
    # Make sure Clothes category is active
    clothes_cat, _ = Category.objects.get_or_create(
        slug='clothes',
        defaults={'category_name': 'Men & Women Apparel', 'description': 'Premium trendy clothes for all occasions', 'is_active': True}
    )
    clothes_cat.category_name = 'Men & Women Apparel'
    clothes_cat.is_active = True
    clothes_cat.save()

    categories_data = [
        {"name": "Men's Collection", "slug": "mens-collection", "desc": "Suits, Shirts, Kurtas & Premium Denim for Men"},
        {"name": "Women's Ethnic & Partywear", "slug": "womens-ethnic", "desc": "Designer Sarees, Lehengas, Anarkalis & Kurtis"},
        {"name": "Casual & Streetwear", "slug": "casual-streetwear", "desc": "Oversized Tees, Graphic Hoodies & Cargo Pants"},
        {"name": "Festive & Wedding Special", "slug": "festive-wedding", "desc": "Royal Silk Kurtas, Bridal & Groomsmen Couture"},
        {"name": "Kids & Teens Wear", "slug": "kids-collection", "desc": "Trendy, comfortable & playful outfits for kids"},
    ]

    cat_objs = {}
    for c in categories_data:
        obj, _ = Category.objects.get_or_create(
            slug=c["slug"],
            defaults={"category_name": c["name"], "description": c["desc"], "is_active": True}
        )
        obj.is_active = True
        obj.category_name = c["name"]
        obj.description = c["desc"]
        obj.save()
        cat_objs[c["slug"]] = obj

    products_data = [
        {
            "name": "Royal Emerald Embroidered Kurta Set",
            "slug": "royal-emerald-embroidered-kurta-set",
            "category": cat_objs["mens-collection"],
            "price": 3499.00,
            "stock": 35,
            "description": "Exquisite hand-woven chanderi silk kurta with intricate gold zari embroidery on collar and cuffs. Paired with pure cotton churidar pants.",
            "variations": [
                ("size", "M"), ("size", "L"), ("size", "XL"), ("size", "XXL"),
                ("color", "Emerald Green"), ("color", "Midnight Navy"), ("color", "Crimson Maroon")
            ]
        },
        {
            "name": "Banarasi Soft Silk Saree with Zari Pallu",
            "slug": "banarasi-soft-silk-saree",
            "category": cat_objs["womens-ethnic"],
            "price": 4899.00,
            "stock": 25,
            "description": "Timeless Banarasi woven silk saree featuring regal floral motifs and pure silver-gold zari border. Comes with unstitched designer blouse piece.",
            "variations": [
                ("size", "Free Size"),
                ("color", "Ruby Red"), ("color", "Peacock Teal"), ("color", "Mustard Gold")
            ]
        },
        {
            "name": "Vintage Wash Slim-Fit Denim Jacket",
            "slug": "vintage-wash-slim-fit-denim-jacket",
            "category": cat_objs["casual-streetwear"],
            "price": 2499.00,
            "stock": 45,
            "description": "Premium 100% heavyweight cotton denim jacket with distressed wash, metallic custom buttons, and comfortable relaxed tailoring.",
            "variations": [
                ("size", "S"), ("size", "M"), ("size", "L"), ("size", "XL"),
                ("color", "Classic Indigo"), ("color", "Charcoal Black"), ("color", "Washed Blue")
            ]
        },
        {
            "name": "Midnight Velvet Sherwani for Grooms",
            "slug": "midnight-velvet-sherwani",
            "category": cat_objs["festive-wedding"],
            "price": 12999.00,
            "stock": 15,
            "description": "Handcrafted royal velvet sherwani with handcrafted French-knot embroidery, antique metal buttons, and matching silk stole.",
            "variations": [
                ("size", "38"), ("size", "40"), ("size", "42"), ("size", "44"),
                ("color", "Deep Velvet Black"), ("color", "Royal Sapphire Blue")
            ]
        },
        {
            "name": "Heavy Georgette Mirror-Work Lehenga Choli",
            "slug": "heavy-georgette-mirror-work-lehenga",
            "category": cat_objs["womens-ethnic"],
            "price": 7999.00,
            "stock": 20,
            "description": "Gorgeous flared georgette lehenga adorned with authentic mirror and thread work. Includes sweetheart neck blouse and scalloped dupatta.",
            "variations": [
                ("size", "S"), ("size", "M"), ("size", "L"), ("size", "XL"),
                ("color", "Blush Rose"), ("color", "Champagne Gold"), ("color", "Pastel Mint")
            ]
        },
        {
            "name": "Urban Typography Heavyweight Oversized Tee",
            "slug": "urban-typography-oversized-tee",
            "category": cat_objs["casual-streetwear"],
            "price": 1299.00,
            "stock": 60,
            "description": "240 GSM super-combed cotton oversized streetwear t-shirt with high-density puff print graphics and drop shoulders.",
            "variations": [
                ("size", "S"), ("size", "M"), ("size", "L"), ("size", "XL"),
                ("color", "Off White"), ("color", "Sage Green"), ("color", "Jet Black")
            ]
        },
        {
            "name": "Little Prince Traditional Kurta Dhoti Set",
            "slug": "little-prince-traditional-kurta-dhoti",
            "category": cat_objs["kids-collection"],
            "price": 1799.00,
            "stock": 40,
            "description": "Ultra-soft, skin-friendly cotton silk ethnic set for young boys. Includes printed jacket, kurta, and pre-stitched comfortable dhoti.",
            "variations": [
                ("size", "2-3 Y"), ("size", "4-5 Y"), ("size", "6-7 Y"), ("size", "8-9 Y"),
                ("color", "Royal Yellow"), ("color", "Sky Blue")
            ]
        },
        {
            "name": "Tailored Oxford Formal Cotton Shirt",
            "slug": "tailored-oxford-formal-cotton-shirt",
            "category": cat_objs["mens-collection"],
            "price": 1899.00,
            "stock": 50,
            "description": "Crisp 100% Egyptian Giza cotton formal shirt with breathable weave, spread collar, and French seams for sharp modern corporate dressing.",
            "variations": [
                ("size", "39"), ("size", "40"), ("size", "42"), ("size", "44"),
                ("color", "Crisp White"), ("color", "Sky Blue"), ("color", "Soft Pink"), ("color", "Navy")
            ]
        }
    ]

    for p in products_data:
        prod, created = Product.objects.get_or_create(
            slug=p["slug"],
            defaults={
                "product_name": p["name"],
                "category": p["category"],
                "price": p["price"],
                "stock": p["stock"],
                "description": p["description"],
                "is_available": True,
            }
        )
        if not created:
            prod.product_name = p["name"]
            prod.category = p["category"]
            prod.price = p["price"]
            prod.stock = p["stock"]
            prod.description = p["description"]
            prod.is_available = True
            prod.save()

        # Add variations
        for var_cat, var_val in p.get("variations", []):
            Variation.objects.get_or_create(
                product=prod,
                variation_category=var_cat,
                variation_value=var_val,
                defaults={"is_active": True}
            )

    print("Seeding completed successfully! Total categories:", Category.objects.count(), "Total products:", Product.objects.count())

if __name__ == "__main__":
    seed()
