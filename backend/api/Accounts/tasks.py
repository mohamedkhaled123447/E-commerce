from celery import shared_task
from django.core.mail import EmailMultiAlternatives


@shared_task
def SendEmail():
    subject = "Welcome to the Django"
    text_content = "This is an important message."
    html_content = """<p>This is an <strong>important</strong> message.</p> 
    <a href="https://www.google.com/">Google</a>"""
    from_email = "moham35356@gmail.com"
    to = "moham35356@gmail.com"
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()
    return
