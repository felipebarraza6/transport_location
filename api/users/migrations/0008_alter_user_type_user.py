# Generated by Django 4.1.5 on 2023-01-16 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_user_dni'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='type_user',
            field=models.CharField(choices=[('ADM', 'administrator'), ('GUA', 'guardians'), ('DRV', 'drivers')], max_length=3),
        ),
    ]
