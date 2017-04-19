
```java
private WindowManager mWindowManager;
private WindowManager.LayoutParams layoutParams;

private TextView mTv;

private void init(Context context) {
    LayoutInflater.from(context).inflate(R.layout.character_toast, this, true);
    mTv = (TextView) findViewById(R.id.tv_text);

    mWindowManager = (WindowManager) getContext().getSystemService(Context.WINDOW_SERVICE);

    layoutParams = new WindowManager.LayoutParams();
    layoutParams.type = WindowManager.LayoutParams.TYPE_TOAST;
    layoutParams.width = WindowManager.LayoutParams.WRAP_CONTENT;
    layoutParams.height = WindowManager.LayoutParams.WRAP_CONTENT;
    layoutParams.flags |= WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE;
    layoutParams.format = PixelFormat.RGBA_8888;
    layoutParams.gravity = Gravity.CENTER;
}

private boolean isShowing;

public void show(@NonNull String character) {
    if (!isShowing) {
        mWindowManager.addView(this, layoutParams);
    }
    mTv.setText(character);
    isShowing = true;
}

public void dismiss() {
    if (isShowing) {
        mWindowManager.removeView(this);
        isShowing = false;
    }
}
```
