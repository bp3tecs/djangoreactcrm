# Generated by Django 3.2.9 on 2022-07-23 18:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0014_contact_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contact',
            old_name='contact_first_name',
            new_name='first_name',
        ),
    ]
