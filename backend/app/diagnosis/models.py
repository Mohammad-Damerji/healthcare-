from django.db import models


class Disease(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    # tags = models.ManyToManyField('Tag', related_name='diseases')
    image = models.ImageField(upload_to='disease_images/')

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
