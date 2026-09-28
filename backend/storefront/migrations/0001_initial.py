import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0002_remove_variant_product_alter_category_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='HeroBanner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('subtitle', models.TextField(blank=True)),
                ('badge', models.CharField(default='ROYAL FESTIVE & WEDDING 2026', max_length=100)),
                ('tag', models.CharField(default='FLAT 50% OFF', max_length=50)),
                ('category_slug', models.CharField(default='all', max_length=100)),
                ('bg_image', models.ImageField(blank=True, null=True, upload_to='banners/')),
                ('image_url', models.URLField(blank=True, max_length=500, null=True)),
                ('accent_color', models.CharField(default='#d4af37', max_length=30)),
                ('cta_text', models.CharField(default='Explore Collection', max_length=50)),
                ('cta_link', models.CharField(default='#catalog-section', max_length=200)),
                ('display_order', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Hero Banner',
                'verbose_name_plural': 'Hero Banners',
                'ordering': ['display_order', '-created_at'],
            },
        ),
        migrations.CreateModel(
            name='StyleLookbook',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('tag', models.CharField(default='Wedding & Sangeet', max_length=100)),
                ('description', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='lookbooks/')),
                ('image_url', models.URLField(blank=True, max_length=500, null=True)),
                ('pieces', models.JSONField(blank=True, default=list, help_text="List of pieces included in the look, e.g. ['Velvet Sherwani', 'Chanderi Stole']")),
                ('total_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('category_slug', models.CharField(default='festive-wedding', max_length=100)),
                ('display_order', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Style Lookbook',
                'verbose_name_plural': 'Style Lookbooks',
                'ordering': ['display_order', '-created_at'],
            },
        ),
        migrations.CreateModel(
            name='CustomerReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('city', models.CharField(default='India', max_length=100)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='reviews/')),
                ('avatar_url', models.URLField(blank=True, max_length=500, null=True)),
                ('rating', models.PositiveIntegerField(default=5)),
                ('outfit_name', models.CharField(blank=True, max_length=200)),
                ('review_text', models.TextField()),
                ('is_verified', models.BooleanField(default=True)),
                ('is_featured', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reviews', to='product.product')),
            ],
            options={
                'verbose_name': 'Customer Review',
                'verbose_name_plural': 'Customer Reviews',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='WishlistItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wishlisted_by', to='product.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wishlist_items', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Wishlist Item',
                'verbose_name_plural': 'Wishlist Items',
                'ordering': ['-created_at'],
                'unique_together': {('user', 'product')},
            },
        ),
    ]
