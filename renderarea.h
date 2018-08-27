#ifndef RENDERAREA_H
#define RENDERAREA_H

#include <QWidget>
#include <QPen>

class RenderArea : public QWidget
{
    Q_OBJECT
public:
    enum Shape {Line, Points, Polyline, Polygon, Rect, RoundedRect,Ellipse, Arc,
               Chord, Pie, Path, Text, Pixmap};
    RenderArea(QWidget *parent = nullptr);
    QSize minimumSizeHint() const override;
    QSize sizeHint() const override;

public slots:
    void setShape(Shape shape);
    void setPen(const QPen &pen);
    void setBrush(const QBrush &brush);
    void setAntialiased(bool antialiased);
    void setTransformed(bool transformed);

protected:
    void paintEvent(QPaintEvent *event) override;
private:
    Shape shape;
    QPen pen;
    QBrush brush;
    bool antialised;
    bool transformed;
    QPixmap pixmap;

};

#endif // RENDERAREA_H
