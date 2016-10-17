# -*- coding: utf-8 -*-
class TemplateExtender
  attr_reader :doc

  def initialize
    @doc = File.open("public/templates/new-age/index.html") do |f|
      Nokogiri::HTML(f)
    end
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
        node['class'] = 'textable'
      elsif type == 'body'
        add_sidebar_to_body(node)
      end
    end
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
    [create_button, submit_button, to_checkbox_directive, edit_button].each do |element|
      if node.children.empty?
        node.add_child(element)
      else
        node.children.first.add_previous_sibling(element)
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





# -add data-ids to every tag
# -add css id’s (uniq) to each tag
# -add every <section>/<header> tags add data-slide=“home” & show-hide directive
  # class = 'textable'

# -add xeditable info from below
  # ex for xeditable)) <h1 id=“one" data-id=“one"><a href="#" editable-text=“page.one">{{ page.one || "empty" }}</a></h1>


  # end

end
