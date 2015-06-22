<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hudl OSS - {% block title %}{% endblock %}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  {% block head %}
  <link rel="stylesheet" type="text/css" href="{{ url_for(theme.css) }}/main.css?v={{ theme.version }}"/>
  {% endblock %}
</head>
<body>
  {% block content %}{% endblock %}
</body>
</html>
