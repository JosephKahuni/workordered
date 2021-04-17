from django.db import models


class Spares(models.Model):
    machine = models.CharField("machine", max_length=100)
    code = models.CharField('spare code', max_length=13, unique=True)
    name = models.CharField('spare name', max_length=150)
    unit_cost = models.FloatField("unit cost", max_length=10, default=0.00)

    class Meta:
        verbose_name = "Spares"
        verbose_name_plural = "Spares"
        ordering = ["id"]

    def __str__(self):
        return "%s - %s" % (self.code, self.name)
