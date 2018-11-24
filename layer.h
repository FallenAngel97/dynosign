#ifndef LAYER_H
#define LAYER_H

#include <QString>
#include <QObject>

class Layer : QObject {

Q_OBJECT

public:

    Layer(QString name, QObject *parent) : QObject(parent){
        transparencyLevel = 99;
        layerName = name;
        hidden = false;
    }
    void updateTransparency(int level) {
        transparencyLevel = level;
    }
    void setHidden(bool _hidden) {
        hidden = _hidden;
    }
    QString getName() {
        return layerName;
    }
    bool isHidden () {
        return hidden;
    }
    int getTransparency() {
        return transparencyLevel;
    }

private:

    int transparencyLevel;
    QString layerName;
    bool hidden;
};
#endif // LAYER_H
