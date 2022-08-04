# Generated by Django 3.2.9 on 2022-07-23 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('test_module', '0002_rename_date_of_birth_test_module_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='test_module',
            name='date',
        ),
        migrations.RemoveField(
            model_name='test_module',
            name='organization',
        ),
        migrations.AddField(
            model_name='test_module',
            name='mobilenumber',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='test_module',
            name='title',
            field=models.CharField(max_length=255, null=True, verbose_name='title'),
        ),
    ]
