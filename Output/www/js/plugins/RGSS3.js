#==============================================================================
# ■ RGSS3 アイテム詳細説明 Ver2.00　by 星潟
#------------------------------------------------------------------------------
# このスクリプトを導入することで
# アイテム画面や装備画面でアイテムにカーソルを合わせた状態で
# 特定のキーを押した際、アイテム詳細説明ウィンドウを
# 開く事が出来るようになります。
# 詳細説明の記述には制御文字を使用する事が出来ます。
#==============================================================================
# アイテム・武器・防具のメモ欄に指定。
# <アイテム説明>が記述された次の行から
# 新たに<アイテム説明>が記載される直前の行までを詳細説明文として扱います。
#------------------------------------------------------------------------------
# 例.
# <アイテム説明>
# あいうえお
# かきくけこ
# さしすせそ
# \C[10]たちつてと
# 
# なにぬねの
# はひふへほ
# <アイテム説明>
# 
# この場合、ハンドアクスの詳細説明は以下のように表示されます。
# 
# [ハンドアクスのアイコン]ハンドアクス       価格[ハンドアクスの価格][通貨単位]
# ハンドアクスの通常のアイテム説明1行目
# ハンドアクスの通常のアイテム説明2行目
# あいうえお
# かきくけこ
# さしすせそ
# たちつてと（赤字で表示）
# 
# なにぬねの
# はひふへほ
#==============================================================================
# 白の魔様のアイテム図鑑スクリプトを使用されている方は
# 他サイト対応素材の
# 「アイテム詳細説明 白の魔様アイテム図鑑併用化」の使用をお勧めします。
#------------------------------------------------------------------------------
# Ver2.00 全体的な処理の改善を行った上で仕様の調整可能箇所を追加。
#         ※ただし過去バージョンとの互換性はありません。
#         旧バージョンからこちらに変更された方で
#         「アイテム詳細説明 白の魔様アイテム図鑑併用化」も併用されていた方は
#         「アイテム詳細説明 白の魔様アイテム図鑑併用化」もVer2.00以降に
#         忘れずに差し替えをお願い致します。
#==============================================================================
module IT_DETAIL
  
  #価格を表示するか否か
  #true  表示
  #false 非表示
  
  Value  = true
  
  #詳細説明表示中は元ウィンドウのカーソルを固定化させるか。
  #true  固定化
  #false 固定化しない
  
  Freeze = false
  
  #ショップでの購入画面でも詳細ウィンドウを表示するか否か。
  #trueで表示する
  #falseで表示しない
  
  Buy   = true
  
  #ショップでの売却画面でも詳細ウィンドウを表示するか否か。
  #trueで表示する
  #falseで表示しない
  
  Sell  = true
  
  #詳細表示ウィンドウの背景透明度
  
  BOP  = 225
  
  #詳細表示ウィンドウ表示中に決定キーを押した際の挙動を指定。
  #trueで詳細ウィンドウを閉じるのみ。
  #falseで詳細ウィンドウを閉じた上で、元のウィンドウも決定が押された扱い。
  
  OKClose = false
  
  #詳細表示ウィンドウ表示中にキャンセルキーを押した際の挙動を指定。
  #trueで詳細ウィンドウを閉じるのみ。
  #falseで詳細ウィンドウを閉じた上で、元のウィンドウもキャンセルが押された扱い。
  
  CancelClose = false
  
  #VALUEがtrueの場合の価格を表示する場合の「価格」の部分の文字色。
  
  V_C1   = 16
  
  #VALUEがtrueの場合の非売品である事を表示する場合の文字色。
  
  V_C2   = 16
  
  #アイテム詳細ウィンドウを開く為のキー
  #機能重複を防ぐ為、:X、:Y、:Z、:ALT、:CTRL、:F5、:F6、:F7、:F8の何れかを推奨。
  
  Key    = :X
  
  #アイテム詳細ウィンドウの開閉時にSEを鳴らすか？
  #true  鳴らす
  #false 鳴らさない
  
  Sound  = true
  
  #アイテム詳細ウィンドウのZ座標を設定。
  
  Z = 1000
  
  #アイテム詳細画面上で説明を設定する為のキーワードを指定。
  
  Word1  = "アイテム説明"
  
  #アイテム詳細画面上で価格を表示する場合の「価格」の文字列を設定。
  
  Word2  = "価格"
  
  #アイテム詳細画面上で価格を表示する場合の「非売品」の文字列を設定。
  
  Word3  = "<非売品>"
  
end
class Scene_MenuBase < Scene_Base
  #--------------------------------------------------------------------------
  # 詳細説明ウィンドウの作成
  #--------------------------------------------------------------------------
  def create_detail_window
    @item_detail_window = Window_Item_Detail.new
    return if !IT_DETAIL::Freeze
    @item_detail_window.set_handler(:ok,method(:ok_item_detail_window))
    @item_detail_window.set_handler(:cancel,method(:cancel_item_detail_window))
  end
  #--------------------------------------------------------------------------
  # カーソル固定モードにおける詳細説明ウィンドウの表示終了
  #--------------------------------------------------------------------------
  def end_item_detail_window(flag)
    @item_detail_window.hide
    w = @item_detail_window.last_window
    w.activate
    if flag
      w.process_ok if !IT_DETAIL::OKClose && w.ok_enabled?
    else
      w.process_cancel if !IT_DETAIL::CancelClose && w.cancel_enabled?
    end
  end
  #--------------------------------------------------------------------------
  # カーソル固定モードにおける詳細説明ウィンドウの表示終了(決定キー版)
  #--------------------------------------------------------------------------
  def ok_item_detail_window
    end_item_detail_window(true)
  end
  #--------------------------------------------------------------------------
  # カーソル固定モードにおける詳細説明ウィンドウの表示終了(キャンセルキー版)
  #--------------------------------------------------------------------------
  def cancel_item_detail_window
    end_item_detail_window(false)
  end
end
class Scene_Shop < Scene_MenuBase
  #--------------------------------------------------------------------------
  # 開始
  #--------------------------------------------------------------------------
  alias start_detail_window start
  def start
    start_detail_window
    create_detail_window
    @buy_window.item_detail_window = @item_detail_window if IT_DETAIL::Buy
    @sell_window.item_detail_window = @item_detail_window if IT_DETAIL::Sell
  end
end
class Scene_Item < Scene_ItemBase
  #--------------------------------------------------------------------------
  # 開始
  #--------------------------------------------------------------------------
  alias start_detail_window start
  def start
    start_detail_window
    create_detail_window
    @item_window.item_detail_window = @item_detail_window
  end
end
class Scene_Equip < Scene_MenuBase
  #--------------------------------------------------------------------------
  # 開始
  #--------------------------------------------------------------------------
  alias start_detail_window start
  def start
    start_detail_window
    create_detail_window
    @slot_window.item_detail_window = @item_detail_window
    @item_window.item_detail_window = @item_detail_window
  end
end
class Window_Selectable < Window_Base
  attr_accessor :item_detail_window
  #--------------------------------------------------------------------------
  # ハンドリング処理
  #--------------------------------------------------------------------------
  alias process_handling_item_detail_window process_handling
  def process_handling
    return if process_detail_window
    process_handling_item_detail_window
  end
  #--------------------------------------------------------------------------
  # 決定の場合
  #--------------------------------------------------------------------------
  alias process_ok_item_detail_window process_ok
  def process_ok
    f = end_detail_window
    if f && IT_DETAIL::OKClose
      Sound.play_ok if IT_DETAIL::Sound
      return activate
    end
    process_ok_item_detail_window
  end
  #--------------------------------------------------------------------------
  # キャンセルの場合
  #--------------------------------------------------------------------------
  alias process_cancel_item_detail_window process_cancel
  def process_cancel
    f = end_detail_window
    if f && IT_DETAIL::CancelClose
      Sound.play_cancel if IT_DETAIL::Sound
      return activate
    end
    process_cancel_item_detail_window
  end
  #--------------------------------------------------------------------------
  # 詳細説明ウィンドウ用の切り替え
  #--------------------------------------------------------------------------
  def process_detail_window
    return false if !(@item_detail_window && self.active && Input.trigger?(IT_DETAIL::Key))
    Sound.play_ok if IT_DETAIL::Sound
    Input.update
    if @item_detail_window.visible
      @item_detail_window.hide
    else
      @item_detail_window.refresh(item)
      @item_detail_window.show
      if IT_DETAIL::Freeze
        @item_detail_window.last_window = self
        @item_detail_window.activate
        deactivate
      end
    end
    true
  end
  #--------------------------------------------------------------------------
  # 詳細説明ウィンドウの表示終了
  #--------------------------------------------------------------------------
  def end_detail_window
    if @item_detail_window && @item_detail_window.visible
      @item_detail_window.hide
      true
    else
      false
    end
  end
  #--------------------------------------------------------------------------
  # ヘルプウィンドウ更新メソッドの呼び出し
  #--------------------------------------------------------------------------
  alias call_update_help_item_detail_window call_update_help
  def call_update_help
    call_update_help_item_detail_window
    if @item_detail_window && @item_detail_window.visible
      @item_detail_window.refresh(item)
    end
  end
end
class Window_Item_Detail < Window_Selectable
  attr_accessor :last_window
  #--------------------------------------------------------------------------
  # 初期化
  #--------------------------------------------------------------------------
  def initialize
    super(0,0,Graphics.width,Graphics.height)
    self.z = IT_DETAIL::Z
    self.back_opacity = IT_DETAIL::BOP
    hide
    deactivate
  end
  #--------------------------------------------------------------------------
  # リフレッシュ
  #--------------------------------------------------------------------------
  def refresh(item)
    contents.clear
    return unless item
    draw_detail_text(item)
  end
  #--------------------------------------------------------------------------
  # テキスト描写
  #--------------------------------------------------------------------------
  def set_text(text)
    @text = text if text != @text
  end
  #--------------------------------------------------------------------------
  # クリア
  #--------------------------------------------------------------------------
  def clear
    set_text("")
  end
  #--------------------------------------------------------------------------
  # 通常のアイテムの説明描写
  #--------------------------------------------------------------------------
  def set_item(item)
    set_text(item ? item.description : "")
  end
  #--------------------------------------------------------------------------
  # アイテムの詳細説明描写
  #--------------------------------------------------------------------------
  def draw_detail_text(item)
    return if !item
    draw_item_name(item, 4, 0, enabled = true, width = 512)
    if IT_DETAIL::Value
      if item.price > 0
        value = item.price
        currency_unit = $data_system.currency_unit
        change_color(text_color(IT_DETAIL::V_C1))
        draw_text(4, 0, 400, line_height, IT_DETAIL::Word2, 2)
        change_color(normal_color)
        draw_currency_value(value, currency_unit, 4, 0, 512)
      else
        change_color(text_color(IT_DETAIL::V_C2))
        draw_text(4, 0, 512, line_height, IT_DETAIL::Word3, 2)
        change_color(normal_color)
      end
    end
    set_item(item)
    draw_text_ex(4, line_height, @text)
    ta = item.detail_description
    return if ta.empty?
    lh = line_height
    ta.each_with_index {|t,i| draw_text_ex(4, (i + 3) * lh, t)}
  end
  #--------------------------------------------------------------------------
  # 詳細説明ウィンドウ用の切り替え
  #--------------------------------------------------------------------------
  def process_detail_window
    return false if !(self.active && Input.trigger?(IT_DETAIL::Key))
    Sound.play_ok if IT_DETAIL::Sound
    Input.update
    if @last_window
      hide
      deactivate
      @last_window.activate
    end
    true
  end
end
class RPG::BaseItem
  #--------------------------------------------------------------------------
  # アイテムの詳細説明
  #--------------------------------------------------------------------------
  def detail_description
    @detail_description ||= create_detail_description
  end
  #--------------------------------------------------------------------------
  # アイテムの詳細説明
  #--------------------------------------------------------------------------
  def create_detail_description
    a = []
    f = false
    note.each_line {|l|
    if /<#{IT_DETAIL::Word1}>/ =~ l
      f ^= true
    elsif f
      a.push(l)
    end}
    a
  end
end