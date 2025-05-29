from setuptools import setup

setup(
    name='backend',
    version='0.1',
    packages=['backend'],
    include_package_data=True,
    install_requires=[
        'pyramid',
        'pyramid_jinja2',
        'sqlalchemy',
        'psycopg2-binary',
        'zope.sqlalchemy',
        'waitress'

    ],
    entry_points={
        'paste.app_factory': [
            'main = backend',
        ],
    },
)
