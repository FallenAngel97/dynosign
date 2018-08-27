#include "colorpickerbutton.h"

#include <QColorDialog>
#include <QPainter>
#include <QVBoxLayout>

ColorPickerButton::ColorPickerButton(QWidget *parent):QFrame(parent)
{
//    backgroundButton = new QPushButton(this);
//    QPixmap pixmap(":/images/color_selector.svg");
//    QIcon backgroundButtonIcon(pixmap);
//    backgroundButton->setIcon(backgroundButtonIcon);
//    QVBoxLayout *base_layout = new QVBoxLayout(this);
//    base_layout->addWidget(backgroundButton);
//    setLayout(base_layout);
}

void ColorPickerButton::paintEvent(QPaintEvent *event)
{
    int margin = 3;
    int height = 30;
    QPainter painter(this);
    painter.setRenderHint(QPainter::Antialiasing);
    painter.setPen(Qt::NoPen);
    QPainterPath path;
    path.addRoundedRect(QRectF(margin + height/4,margin + height/4, 15, 15), 10, 10);
    QPainterPath borderPath;
    borderPath.addRoundRect(QRectF(margin,margin,height, height), 10,10);
    painter.fillPath(path, Qt::red);
    painter.drawPath(path);
    QPen pen(Qt::red, 6, Qt::SolidLine, Qt::RoundCap, Qt::RoundJoin);
    painter.setPen(pen);
    painter.drawPath(borderPath);
}

void ColorPickerButton::mouseReleaseEvent(QMouseEvent *event)
{
    QColorDialog dialog(this);
    dialog.getColor();
}

QSize ColorPickerButton::sizeHint() const
{
    return QSize(36,36);
}

QSize ColorPickerButton::minimumSizeHint() const
{
    return QSize(36,36);
}
