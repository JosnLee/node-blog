/**
 * Created by Estevao on 31-05-2015.
 */
require('source-map-support').install();
require('chai').should();
require('sinon');
var showdown = require('../bootstrap').showdown;

describe('showdown.Converter', function () {
  'use strict';

  describe('option methods', function () {
    var converter = new showdown.Converter();

    it('setOption() should set option foo=baz', function () {
      converter.setOption('foo', 'baz');
    });

    it('getOption() should get option foo to equal baz', function () {
      converter.getOption('foo').should.equal('baz');
    });

    it('getOptions() should contain foo=baz', function () {
      var options = converter.getOptions();
      options.should.have.ownProperty('foo');
      options.foo.should.equal('baz');
    });
  });

  describe('setFlavor method', function () {

    /**
     * Test setFlavor('github')
     */
    describe('github', function () {
      var converter = new showdown.Converter(),
        ghOpts = {
          omitExtraWLInCodeBlocks:   true,
          prefixHeaderId:            'user-content-',
          simplifiedAutoLink:        true,
          literalMidWordUnderscores: true,
          strikethrough:             true,
          tables:                    true,
          tablesHeaderId:            true,
          ghCodeBlocks:              true,
          tasklists:                 true
        };

      converter.setFlavor('github');

      for (var opt in ghOpts) {
        if (ghOpts.hasOwnProperty(opt)) {
          check(opt, ghOpts[opt]);
        }
      }
      function check(key, val) {
        it('should set ' + opt + ' to ' + val, function () {
          converter.getOption(key).should.equal(val);
        });
      }
    });
  });

  describe('extension methods', function () {
    var extObjMock = {
          type: 'lang',
          filter: function () {}
        },
        extObjFunc = function () {
          return extObjMock;
        };

    it('addExtension() should add an extension Object', function () {
      var converter = new showdown.Converter();
      converter.addExtension(extObjMock);
      converter.getAllExtensions().language.should.contain(extObjMock);
    });

    it('addExtension() should unwrap an extension wrapped in a function', function () {
      var converter = new showdown.Converter();

      converter.addExtension(extObjFunc);
      converter.getAllExtensions().language.should.contain(extObjMock);
    });

    it('useExtension() should use a previous registered extension in showdown', function () {
      showdown.extension('foo', extObjMock);
      var converter = new showdown.Converter();

      converter.useExtension('foo');
      converter.getAllExtensions().language.should.contain(extObjMock);
      showdown.resetExtensions();
    });
  });

  describe('events', function () {
    var events = [
          'anchors',
          'autoLinks',
          'blockGamut',
          'blockQuotes',
          'codeBlocks',
          'codeSpans',
          'githubCodeBlocks',
          'headers',
          'images',
          'italicsAndBold',
          'lists',
          'paragraph',
          'spanGamut'
          //'strikeThrough',
          //'tables'
        ];

    for (var i = 0; i < events.length; ++i) {
      runListener(events[i] + '.before');
      runListener(events[i] + '.after');
    }

    function runListener (name) {
      it('should listen to ' + name, function () {
        var converter = new showdown.Converter();
        converter.listen(name, function (evtName, text) {
          evtName.should.equal(name);
          text.should.match(/^[\s\S]*foo[\s\S]*$/);
          return text;
        })
          .makeHtml('foo');
      });
    }
  });
});
