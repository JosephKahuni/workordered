from django.db import models


class Engineering(models.Model):
    objects = models.Manager()
    
    payroll_number = models.CharField(max_length=15, unique=True)
    full_name = models.CharField(max_length=50)
    screen_name = models.CharField(max_length=25)
    field = models.CharField(max_length=20)
    phone_number = models.IntegerField(unique=True)
    alternative_phone_number = models.IntegerField(
        null=True, blank=True, unique=True)

    class Meta:
        verbose_name = "Engineering"
        verbose_name_plural = "Engineering"

    def save(self, *args, **kwargs):
        print("\n\n\n\nsave method called\n\n\n\n")
        if not self.alternative_phone_number:
            self.alternative_phone_number = None

        super().save(*args, **kwargs)
