from celery import shared_task
from django.core.mail import EmailMultiAlternatives
import uuid
from django.conf import settings
from .models import User


@shared_task
def SendEmail(id):
    user = User.objects.get(id=id)
    subject = "Verification code"
    text_content = "Verification code."
    html_content = f"""<h3>Verification Link</h3> 
    <p><a href="{settings.WEB_ROOT_URL}/confirmemail?code={user.confirmation_code}&id={id}">{settings.WEB_ROOT_URL}/confirmemail?code={user.confirmation_code}&id={id}<a><p>"""
    from_email = settings.EMAIL_HOST_USER
    to = settings.EMAIL_HOST_USER
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()
    return
