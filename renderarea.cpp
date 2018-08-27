#include "renderarea.h"
#include <QPainter>
RenderArea::RenderArea(QWidget *parent) : QWidget(parent)
{
    shape = Polygon;
    antialised = false;
    transformed = false;
    pixmap.load(":/images/image.svg");

    setBackgroundRole(QPalette::Base);
    setAutoFillBackground(true);
}

QSize RenderArea::minimumSizeHint() const
{
    return QSize(100,100);
}

QSize RenderArea::sizeHint() const
{
    return QSize(400,200);
}

void RenderArea::setShape(Shape shape)
{
    this->shape = shape;
    update();
}

void RenderArea::setPen(const QPen &pen)
{
    this->pen = pen;
    update();
}

void RenderArea::setBrush(const QBrush &brush)
{
    this->brush = brush;
    update();
}

void RenderArea::setAntialiased(bool antialiased)
{
    this->antialised = antialiased;
    update();
}

void RenderArea::setTransformed(bool transformed)
{
    this->transformed = transformed;
    update();
}

void RenderArea::paintEvent(QPaintEvent *event)
{
    static const QPoint points[4] = {
        QPoint(10,80),
        QPoint(20,10),
        QPoint(80,30),
        QPoint(90,70)
    };
    QRect rect(10,20,80,60);
    QPainterPath path;
    path.moveTo(20,80);
    path.lineTo(20,30);
    path.cubicTo(80,0,50,50,80,80);
    int startAngle = 20*16;
    int arcLength = 120*16;
    QPainter painter(this);
    painter.setPen(pen);
    painter.setBrush(brush);
    if(antialised)
        painter.setRenderHint(QPainter::Antialiasing, true);
    for(int x=0;x<width();x+=100) {
        for (int y=0;y<height();y+=100) {
            painter.save();
            painter.translate(x,y);
            if(transformed) {
                painter.translate(50,50);
                painter.rotate(60.0);
                painter.scale(0.6,0.9);
                painter.translate(-50,-50);
            }
            switch(shape) {
            case Line:
                painter.drawLine(rect.bottomLeft(), rect.topRight());
                break;
            case Points:
                painter.drawPoints(points, 4);
                break;
            case Polyline:
                painter.drawPolyline(points, 4);
                break;
            case Polygon:
                painter.drawPolygon(points, 4);
                break;
            case Rect:
                painter.drawRect(rect);
                break;
            case RoundedRect:
                painter.drawRoundedRect(rect, 25, 25, Qt::RelativeSize);
                break;
            case Ellipse:
                painter.drawEllipse(rect);
                break;
            case Arc:
                painter.drawArc(rect, startAngle, arcLength);
                break;
            case Chord:
                painter.drawChord(rect, startAngle, arcLength);
                break;
            case Pie:
                painter.drawPath(path);
                break;
            case Path:
                painter.drawPath(path);
                break;
            case Text:
                painter.drawText(rect, Qt::AlignCenter, tr("Qt by \nThe Qt Company"));
                break;
            case Pixmap:
                painter.drawPixmap(10,10,pixmap);
            }
            painter.restore();
        }
    }
    painter.setRenderHint(QPainter::Antialiasing, false);
    painter.setPen(palette().dark().color());
    painter.setBrush(Qt::NoBrush);
    painter.drawRect(QRect(0,0,width() - 1, height() - 1));
}
