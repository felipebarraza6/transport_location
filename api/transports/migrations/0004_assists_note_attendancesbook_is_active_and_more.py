# Generated by Django 4.1.5 on 2023-01-16 14:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('transports', '0003_alter_attendancesbook_total_students'),
    ]

    operations = [
        migrations.AddField(
            model_name='assists',
            name='note',
            field=models.TextField(blank=True, max_length=1200, null=True),
        ),
        migrations.AddField(
            model_name='attendancesbook',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='location',
            name='attendance_book',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='transports.attendancesbook'),
            preserve_default=False,
        ),
    ]