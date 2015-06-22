{% extends '_layout.swig' %}

{% block title %}My Page{% endblock %}

{% block head %}
  {% parent %}
  {# <link rel="stylesheet" href="custom.css"> #}
{% endblock %}

{% block content %}
<p>This is just an awesome index page.</p>
{% for post in page.posts %}
  <a href="{{ url_for(post.path) }}">{{post.name}}</a>
{% endfor %}
{% endblock %}
