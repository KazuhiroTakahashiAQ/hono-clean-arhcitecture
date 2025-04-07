import triangulate from 'three-obj-earcut';

// 以下、ファイルアップロード処理などのコード…
const fileInput = document.getElementById('fileInput');
const processButton = document.getElementById('processButton');
const downloadLink = document.getElementById('downloadLink');
const messageDiv = document.getElementById('message');

let originalObjText = '';

if (fileInput) {
  fileInput.addEventListener('change', (e) => {
    console.log("ファイル選択イベントが発火しました");
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      originalObjText = reader.result;
      messageDiv.textContent = `ファイル読み込み完了: ${file.name}`;
    };
    reader.onerror = () => {
      messageDiv.textContent = 'ファイル読み込みエラー';
    };
    reader.readAsText(file);
  });
}

if (processButton) {
  processButton.addEventListener('click', () => {
    console.log("処理ボタンがクリックされました");

    if (!originalObjText) {
      messageDiv.textContent = 'OBJファイルが選択されていません。';
      return;
    }

    try {
      // three-obj-earcut を使って三角形分割を実行
      const triangulatedObjText = triangulate(originalObjText);

      // 変換後のOBJテキストからBlobを生成し、ダウンロードリンクを更新
      const blob = new Blob([triangulatedObjText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.style.display = 'inline';
      messageDiv.textContent = '変換が完了しました。下のリンクからダウンロードしてください。';
    } catch (error) {
      console.error(error);
      messageDiv.textContent = '変換中にエラーが発生しました。';
    }
  });
}
