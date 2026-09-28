import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from product.models import Category, Product, Variation
from storefront.models import HeroBanner, CustomerReview, StyleLookbook
from orders.models import Coupon

def seed_all():
    print("Starting full database seed for Malak Fashion Hub...")

    # 1. Categories
    categories_data = [
        {
            "name": "Men's Collection",
            "slug": "mens-collection",
            "desc": "Suits, Shirts, Kurtas & Premium Denim for Men",
        },
        {
            "name": "Women's Ethnic & Partywear",
            "slug": "womens-ethnic",
            "desc": "Designer Sarees, Lehengas, Anarkalis & Kurtis",
        },
        {
            "name": "Casual & Streetwear",
            "slug": "casual-streetwear",
            "desc": "Oversized Tees, Graphic Hoodies & Cargo Pants",
        },
        {
            "name": "Festive & Wedding Special",
            "slug": "festive-wedding",
            "desc": "Royal Silk Kurtas, Bridal & Groomsmen Couture",
        },
        {
            "name": "Kids & Teens Wear",
            "slug": "kids-collection",
            "desc": "Trendy, comfortable & playful outfits for kids",
        },
    ]

    cat_map = {}
    for c in categories_data:
        obj, _ = Category.objects.get_or_create(
            slug=c["slug"],
            defaults={"category_name": c["name"], "description": c["desc"], "is_active": True}
        )
        obj.category_name = c["name"]
        obj.description = c["desc"]
        obj.is_active = True
        obj.save()
        cat_map[c["slug"]] = obj

    # 2. Products & Variations
    products_data = [
        {
            "name": "Royal Emerald Embroidered Kurta Set",
            "slug": "royal-emerald-embroidered-kurta-set",
            "category": cat_map["mens-collection"],
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
            "category": cat_map["womens-ethnic"],
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
            "category": cat_map["casual-streetwear"],
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
            "category": cat_map["festive-wedding"],
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
            "category": cat_map["womens-ethnic"],
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
            "category": cat_map["casual-streetwear"],
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
            "category": cat_map["kids-collection"],
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
            "category": cat_map["mens-collection"],
            "price": 1899.00,
            "stock": 50,
            "description": "Crisp 100% Egyptian Giza cotton formal shirt with breathable weave, spread collar, and French seams for sharp modern corporate dressing.",
            "variations": [
                ("size", "39"), ("size", "40"), ("size", "42"), ("size", "44"),
                ("color", "Crisp White"), ("color", "Sky Blue"), ("color", "Soft Pink"), ("color", "Navy")
            ]
        }
    ]

    prod_map = {}
    for p in products_data:
        prod, _ = Product.objects.get_or_create(
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
        prod.product_name = p["name"]
        prod.category = p["category"]
        prod.price = p["price"]
        prod.stock = p["stock"]
        prod.description = p["description"]
        prod.is_available = True
        prod.save()
        prod_map[p["slug"]] = prod

        for var_cat, var_val in p.get("variations", []):
            Variation.objects.get_or_create(
                product=prod,
                variation_category=var_cat,
                variation_value=var_val,
                defaults={"is_active": True}
            )

    # 3. Hero Banners
    banners_data = [
        {
            "title": "The Art of Royal Festive Couture",
            "subtitle": "Handcrafted Banarasi Silks, Velvet Sherwanis & Embroidered Lehengas for Grand Celebrations.",
            "badge": "ROYAL FESTIVE & WEDDING 2026",
            "tag": "FLAT 50% OFF",
            "category_slug": "festive-wedding",
            "image_url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85",
            "accent_color": "#d4af37",
            "display_order": 1,
        },
        {
            "title": "Timeless Sarees & Designer Lehengas",
            "subtitle": "Intricate Gold Zari Kadwa Weaves & Pure Georgette Ensembles Crafted by Master Artisans.",
            "badge": "LUXURY ETHNIC DRAPES",
            "tag": "BESTSELLER COLLECTION",
            "category_slug": "womens-ethnic",
            "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
            "accent_color": "#e63946",
            "display_order": 2,
        },
        {
            "title": "Streetwear & Heavyweight Drops",
            "subtitle": "240 GSM Bio-Washed Combed Cotton Oversized Tees, Tailored Oxford Shirts & Selvedge Denim.",
            "badge": "URBAN LUXURY CASUALS",
            "tag": "NEW ARRIVALS",
            "category_slug": "casual-streetwear",
            "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=85",
            "accent_color": "#457b9d",
            "display_order": 3,
        },
    ]

    for b in banners_data:
        banner, _ = HeroBanner.objects.get_or_create(
            title=b["title"],
            defaults={
                "subtitle": b["subtitle"],
                "badge": b["badge"],
                "tag": b["tag"],
                "category_slug": b["category_slug"],
                "image_url": b["image_url"],
                "accent_color": b["accent_color"],
                "display_order": b["display_order"],
                "is_active": True,
            }
        )
        banner.subtitle = b["subtitle"]
        banner.badge = b["badge"]
        banner.tag = b["tag"]
        banner.category_slug = b["category_slug"]
        banner.image_url = b["image_url"]
        banner.accent_color = b["accent_color"]
        banner.display_order = b["display_order"]
        banner.is_active = True
        banner.save()

    # 4. Customer Reviews
    reviews_data = [
        {
            "name": "Aarav Singhania",
            "city": "Mumbai",
            "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            "rating": 5,
            "outfit_name": "Royal Emerald Silk Kurta Set",
            "product": prod_map.get("royal-emerald-embroidered-kurta-set"),
            "review_text": "The fabric quality of the Chanderi silk kurta is outstanding! The gold zari detailing on the collar gave me endless compliments at my brother's engagement. Delivered in 2 days in immaculate packaging.",
        },
        {
            "name": "Pooja Verma",
            "city": "Delhi NCR",
            "avatar_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
            "rating": 5,
            "outfit_name": "Banarasi Soft Silk Saree",
            "product": prod_map.get("banarasi-soft-silk-saree"),
            "review_text": "I ordered the Ruby Crimson Banarasi saree for Karva Chauth. The zari sheen and soft drape feel like a boutique designer piece worth ₹15,000+. Malak Fashion Hub has won a customer for life!",
        },
        {
            "name": "Rohan Patel",
            "city": "Ahmedabad",
            "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
            "rating": 5,
            "outfit_name": "Tokyo Cyber 240 GSM Oversized Tee",
            "product": prod_map.get("urban-typography-oversized-tee"),
            "review_text": "Finally found authentic heavyweight streetwear tees that do not shrink or fade after wash. The drop shoulder fit is immaculate. 10/10 recommendation for casual wear lovers.",
        },
    ]

    for r in reviews_data:
        rev, _ = CustomerReview.objects.get_or_create(
            name=r["name"],
            outfit_name=r["outfit_name"],
            defaults={
                "city": r["city"],
                "avatar_url": r["avatar_url"],
                "rating": r["rating"],
                "product": r["product"],
                "review_text": r["review_text"],
                "is_verified": True,
                "is_featured": True,
            }
        )
        rev.city = r["city"]
        rev.avatar_url = r["avatar_url"]
        rev.rating = r["rating"]
        rev.product = r["product"]
        rev.review_text = r["review_text"]
        rev.is_verified = True
        rev.is_featured = True
        rev.save()

    # 5. Style Lookbooks
    lookbooks_data = [
        {
            "title": "The Royal Sovereign Groom Ensemble",
            "tag": "Wedding & Sangeet",
            "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
            "description": "Deep midnight velvet sherwani paired with an antique gold zari stole and handcrafted juttis.",
            "pieces": ["Velvet Sherwani", "Chanderi Stole", "Tapered Trousers"],
            "total_price": 14999.00,
            "category_slug": "festive-wedding",
            "display_order": 1,
        },
        {
            "title": "The Modern Heritage Banarasi Elegance",
            "tag": "Bridal & Reception",
            "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
            "description": "Traditional Katan silk saree styled with a sweetheart neckline embroidered blouse & temple jewelry.",
            "pieces": ["Banarasi Silk Saree", "Zari Blouse Piece", "Matching Petticoat"],
            "total_price": 5899.00,
            "category_slug": "womens-ethnic",
            "display_order": 2,
        },
        {
            "title": "Tokyo Minimalist Streetwear Fit",
            "tag": "Casual & Daily",
            "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
            "description": "Heavyweight 240 GSM oversized drop-shoulder tee layered with washed denim jacket & utility cargoes.",
            "pieces": ["240 GSM Graphic Tee", "Vintage Chore Jacket", "Relaxed Cargo Pants"],
            "total_price": 3798.00,
            "category_slug": "casual-streetwear",
            "display_order": 3,
        },
    ]

    for lb in lookbooks_data:
        look, _ = StyleLookbook.objects.get_or_create(
            title=lb["title"],
            defaults={
                "tag": lb["tag"],
                "image_url": lb["image_url"],
                "description": lb["description"],
                "pieces": lb["pieces"],
                "total_price": lb["total_price"],
                "category_slug": lb["category_slug"],
                "display_order": lb["display_order"],
                "is_active": True,
            }
        )
        look.tag = lb["tag"]
        look.image_url = lb["image_url"]
        look.description = lb["description"]
        look.pieces = lb["pieces"]
        look.total_price = lb["total_price"]
        look.category_slug = lb["category_slug"]
        look.display_order = lb["display_order"]
        look.is_active = True
        look.save()

    # 6. Coupons
    coupons_data = [
        {
            "code": "MALAK50",
            "discount_rate": 0.50,
            "discount_amount": 0.00,
            "free_shipping": False,
            "min_order_amount": 999.00,
            "description": "50% Royal Festive Discount",
        },
        {
            "code": "FIRST10",
            "discount_rate": 0.10,
            "discount_amount": 0.00,
            "free_shipping": False,
            "min_order_amount": 499.00,
            "description": "10% Welcome Discount for New Patrons",
        },
        {
            "code": "FREESHIP",
            "discount_rate": 0.00,
            "discount_amount": 0.00,
            "free_shipping": True,
            "min_order_amount": 0.00,
            "description": "Free Doorstep Express Delivery on Any Order",
        },
    ]

    for c in coupons_data:
        coup, _ = Coupon.objects.get_or_create(
            code=c["code"],
            defaults={
                "discount_rate": c["discount_rate"],
                "discount_amount": c["discount_amount"],
                "free_shipping": c["free_shipping"],
                "min_order_amount": c["min_order_amount"],
                "description": c["description"],
                "is_active": True,
            }
        )
        coup.discount_rate = c["discount_rate"]
        coup.discount_amount = c["discount_amount"]
        coup.free_shipping = c["free_shipping"]
        coup.min_order_amount = c["min_order_amount"]
        coup.description = c["description"]
        coup.is_active = True
        coup.save()

    print("Database seeding completed successfully!")
    print(f"- Categories: {Category.objects.count()}")
    print(f"- Products: {Product.objects.count()}")
    print(f"- Hero Banners: {HeroBanner.objects.count()}")
    print(f"- Customer Reviews: {CustomerReview.objects.count()}")
    print(f"- Style Lookbooks: {StyleLookbook.objects.count()}")
    print(f"- Coupons: {Coupon.objects.count()}")

if __name__ == "__main__":
    seed_all()
