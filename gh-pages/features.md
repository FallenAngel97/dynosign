---
layout: default
title: Dynosign
---
<h2>Demo of program</h2>
<table id='features_table'>
    {% for description in site.data.pageslist.descriptions cols:1 %}
        <tr>
            <td>
                {% if description.icon != '' %}
                    <img class='tool_icon' src="{{ site.baseurl }}/assets/images/{{ description.icon }}.svg" />
                {% endif %}
                {{ description.text }}
            </td>
            <td><img src="{{ site.baseurl }}/assets/images/output{{ forloop.index }}.gif" /></td>
        </tr>
    {% endfor %}
</table>