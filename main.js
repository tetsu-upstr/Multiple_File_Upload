//「 _ 」を定義してgetElementByIdを省略する
function _(id){ return document.getElementById(id); }

// const UPLOAD_BTN = document.getElementById('upload_btn');
_('upload_btn').addEventListener('click', function() {
  uploadFiles();
});

function uploadFiles() {
  var formdata = new FormData();
  var ufiles = _('userfiles').files;
  for (var i = 0; i < ufiles.length; i++) {
      formdata.append( 'file_' + i, ufiles[i] ); // file.name ( name / size / type )
  }
  formdata.append('username', 'select_file'); // append('key', 'value');
  var ajax = new XMLHttpRequest();
  ajax.upload.addEventListener('progress', progressHandler, false);
  ajax.addEventListener('load', completeHandler, false);
  ajax.open('POST', 'parser.php');
  ajax.send(formdata);
}

function progressHandler(event) {
  _('loaded_n_total').innerHTML = 'Uploaded ' + event.loaded + ' bytes of ' + event.total;
  var percent = (event.loaded / event.total) * 100;
  _('progressBar').value = Math.round(percent);
  _('status').innerHTML = Math.round(percent) + '% アップロード中です... お待ちください。'; 
}

function completeHandler(event) {
  _('status').innerHTML = event.target.responseText;
  _('progressBar').value = 0;
  _('upload_form').reset(); // or target_input.value = ''; input要素をクリアする処理
}

// ドラッグ&ドロップの発火
document.addEventListener('dragstart', function(event){
  addDraggingEffect();
});

// ファイルをドラッグしているとき
_('dropzone').addEventListener('dragover', function(event){
  event.preventDefault();
  // dragover内に処理は書かない方が良い（ずっと発生し続ける為）
});

// ファイルがdropzoneに挿入されたとき
_('dropzone').addEventListener('dragenter', function(event){
  addEnterEffect();
});

// ファイルがdropzoneから離れたとき
_('dropzone').addEventListener('dragleave', function(event){
  removeEnterEffect();
});

// ドロップが終わったとき
_('dropzone').addEventListener('dragend', function(event){
  resetAllEffect();
});

// ファイルをdropzoneでドロップしたとき
_('dropzone').addEventListener('drop', function(event){
  event.preventDefault();
  var formdata = new FormData();
  var files = event.dataTransfer.files; // filesはオブジェクト→[object File]
  for (var i = 0; i < files.length; i++) {
    formdata.append( 'file_' + i, files[i] ); // file.name ( name / size / type )
  }
  formdata.append('username', 'select_file'); // append('key', 'value');
  var ajax = new XMLHttpRequest();
  ajax.upload.addEventListener('progress', progressHandler, false);
  ajax.addEventListener('load', completeHandler, false);
  ajax.open('POST', 'parser.php');
  ajax.send(formdata);
  var text = event.dataTransfer.getData('text');
  this.textContent = files[0].name + 'がドロップされました';
});

// ドラッグイベントの処理
function addDraggingEffect() {
  _('dropzone').classList.add('dragging');
}

function removeDraggingEffect() {
  _('dropzone').classList.remove('dragging');
}

function addEnterEffect() {
  _('dropzone').classList.add('dragenter');
}

function removeEnterEffect() {
  _('dropzone').classList.remove('dragenter');
}

function resetAllEffect() {
  removeDraggingEffect();
  removeEnterEffect();
}