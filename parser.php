<?php
if (isset( $_POST['username'])) {
    foreach ( $_FILES as $file ) {
      // tmp_name / name / type / size / error
      move_uploaded_file( $file['tmp_name'], 'uploads/' . $file['name'] );
    }
    echo 'アップロード完了';
 }