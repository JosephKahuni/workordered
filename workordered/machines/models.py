from django.db import models


class Sections(models.Model):
    objects = models.Manager()

    name = models.CharField(max_length=30, unique=True)

    class Meta:
        verbose_name = "Factory Sections"
        verbose_name_plural = "Factory Sections"

    def __str__(self):
        return self.name


class Machines(models.Model):
    objects = models.Manager()

    section = models.ForeignKey(
        Sections, on_delete=models.CASCADE,)
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Machines"
        verbose_name_plural = "Machines"

    def __str__(self):
        return self.name
