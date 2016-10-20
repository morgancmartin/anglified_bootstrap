# coding: utf-8
require 'open-uri'
require 'css_parser'

class TemplateExtender
  attr_reader :doc
  include CssParser

  def initialize(index_url = nil)
    @doc = Nokogiri::HTML(open(index_url)) if index_url
  end

  def run
    add_attributes
    save_doc('index.html')
  end

  def add_attributes
    seen_nodes = Hash.new(0)
    @doc.css('*').each do |node|
      type = node.node_name
      seen_nodes[type] += 1
      # add data id
      node['data-id'] = "#{type.upcase}_#{seen_nodes[type]}"
      # add id
      node['id'] = "#{type.upcase}_#{seen_nodes[type]}"
      if type == 'section' || type == 'header'
        add_section_attributes(node)
      elsif tiny_mce_node?(type)
        if node['class']
          node['class'] += ' textable'
        else
          node['class'] = ' textable'
        end
        change_img_src(node) if type == 'img'
      elsif type == 'body'
        add_ng_controller_to_body(node)
        add_sidebar_to_body(node)
      elsif type == 'script'
        node.remove
      end
    end
    @body = @doc.css('body').first
    # add_template_css
  end

  def add_ng_controller_to_body(node)
    node['ng-controller'] = 'PageWatchCtrl'
    # added this for ctrl-z undo funcitonality
    node['ng-keyup'] = "onKeyUp($event)"
  end

  def change_img_src(node)
    node['src'] = "/#{@file_name}/#{node['src']}"
  end

  def add_sidebar_to_body(body_node)
    if body_node.children.empty?
      body_node.add_child(sidebar_element)
    else
      body_node.children.first.add_previous_sibling(sidebar_element)
    end
  end

  def submit_button
    btn = Nokogiri::XML::Node.new "button", @doc
    btn['class'] = 'create-slide'
    btn['ng-click'] = 'submitPage()'
    btn.content = 'Submit'
    btn
  end

  def sidebar_element
    bar = Nokogiri::XML::Node.new "side-bar", @doc
    bar['class'] = 'sidebar'
    bar
  end

  def add_section_attributes(node)
    node['data-slide'] = 'home'
    node['show-hide'] = nil
    if node.node_name == 'header'
      add_elements(node.css('.header-content-inner').first)
    elsif node.node_name == 'section'
      add_elements(node)
    end
  end

  def add_elements(node)
    if node
      [create_button, submit_button, to_checkbox_directive, edit_button].each do |element|
        if node.children.empty?
          node.add_child(element)
        else
          node.children.first.add_previous_sibling(element)
        end
      end
    end
  end

  def save_doc(file_path)
    File.write(file_path, @doc.to_s)
  end

  def tiny_mce_node?(type)
    type == 'p' ||
      type == 'a' ||
      type == 'h1' ||
      type == 'h2' ||
      type == 'h3' ||
      type == 'img'
  end

  def create_button
    btn = Nokogiri::XML::Node.new "button", @doc
    btn['class'] = 'create-slide'
    btn['ng-click'] = 'createSlide($event)'
    btn.content = 'Make New Slide'
    btn
  end

  def edit_button
    btn = Nokogiri::XML::Node.new "button", @doc
    btn['class'] = 'edit-slide'
    btn['ng-hide'] = 'editStates.section'
    btn.content = 'edit'
    btn
  end

  def to_checkbox_directive
    checkbox = Nokogiri::XML::Node.new "to-checkbox", @doc
    checkbox['ng-show'] = 'editStates.section'
    checkbox
  end

  def add_stylesheet_to_body(body_node, stylesheet_link)
    parser = CssParser::Parser.new
    parser.load_uri!(stylesheet_link)
    contents = parser.to_s
    style = Nokogiri::XML::Node.new "style", @doc
    style.content = contents
    body_node.add_child(style)
  end

  def add_script_to_body(body_node, script_link)
    parser = CssParser::Parser.new
    parser.load_uri!(script_link)
    contents = parser.to_s
    script = Nokogiri::XML::Node.new "script", @doc
    script.content = contents
    body_node.add_child(script)
  end

  def add_template_css
    # css_urls = GithubApi.new.get_template_css_urls(@template.repo_name)
    css_urls = GithubApi.new.get_template_css_urls('BlackrockDigital/startbootstrap-new-age')
    css_urls.each do |url|
      add_stylesheet_to_body(@body, url)
    end
  end

  def add_template_js
    # js_urls = GithubApi.new.get_template_js_urls(@template.repo_name)
    js_urls = GithubApi.new.get_template_js_urls('BlackrockDigital/startbootstrap-new-age')
    js_urls.each do |url|
      add_stylesheet_to_body(@body, url)
    end
  end

end
