#ifndef COLORPICKERBUTTON_H
#define COLORPICKERBUTTON_H

#include <QFrame>
#include <QPushButton>



class ColorPickerButton : public QFrame
{
    Q_OBJECT
public:
    ColorPickerButton(QWidget *parent = 0);
private:
    QPushButton *backgroundButton;
    void paintEvent(QPaintEvent *event) override;
    void mouseReleaseEvent(QMouseEvent *event) override;
    QSize sizeHint() const override;
    QSize minimumSizeHint() const override;

};

#endif // COLORPICKERBUTTON_H
