# Generated by Django 4.1.4 on 2022-12-22 00:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transports', '0002_grade_student_location_attendancesbook_assists'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendancesbook',
            name='total_students',
            field=models.IntegerField(default=0),
        ),
    ]
