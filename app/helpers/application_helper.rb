module ApplicationHelper
  def include_javascript (file)
    s = " <script type=\"text/javascript\">" + render(:file => file) + "</script>"
    puts s
    content_for(:head, raw(s))
  end
end
